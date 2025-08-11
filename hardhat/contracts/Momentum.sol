// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

contract Momentum {
    constructor(){}

    MotivationalTip[] public motivationalTips;
    
    mapping(address => Task[]) public userTasks;

    struct MotivationalTip {
        address owner;
        string text;
    }

    struct Task {
        uint256 id;
        string description;
        uint256 deadline;
        bool completed;
        bool slashed;
        uint256 createdAt;
    }

    // Events
    event TaskCreated(address indexed user, uint256 indexed taskId, string description, uint256 deadline, uint256 stakeAmount);
    event TaskCompleted(address indexed user, uint256 indexed taskId);

    function getMotivationalTips() public view returns (MotivationalTip[] memory){
        return motivationalTips;
    }

    function createMotivationalTip(string memory _text) public {
        motivationalTips.push(MotivationalTip(msg.sender, _text));
    }


    function createTask(string memory _description, uint256 _durationInHours, uint256 _stakeAmount) 
        public  
    {
        require(_durationInHours > 0, "Duration must be greater than 0");

        uint256 deadline = block.timestamp + (_durationInHours * 1 hours);
        uint256 taskId = userTasks[msg.sender].length;

        userTasks[msg.sender].push(Task({
            id: taskId,
            description: _description,
            deadline: deadline,
            completed: false,
            slashed: false,
            createdAt: block.timestamp
        }));

        emit TaskCreated(msg.sender, taskId, _description, deadline);
    }

    function completeTask(uint256 _taskId) public {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");
        Task storage task = userTasks[msg.sender][_taskId];
        
        require(!task.completed, "Task already completed");
        require(!task.slashed, "Task already slashed");
        require(block.timestamp <= task.deadline, "Task deadline has passed");

        task.completed = true;
        
        emit TaskCompleted(msg.sender, _taskId);
    }

    function getUserTasks(address _user) public view returns (Task[] memory) {
        return userTasks[_user];
    }

    function getTaskById(address _user, uint256 _taskId) public view returns (Task memory) {
        require(_taskId < userTasks[_user].length, "Task does not exist");
        return userTasks[_user][_taskId];
    }

    function getActiveTasks(address _user) public view returns (Task[] memory) {
        Task[] memory allTasks = userTasks[_user];
        uint256 activeCount = 0;
        
        // Count active tasks
        for (uint256 i = 0; i < allTasks.length; i++) {
            if (!allTasks[i].completed && !allTasks[i].slashed && block.timestamp <= allTasks[i].deadline) {
                activeCount++;
            }
        }
        
        // Create array of active tasks
        Task[] memory activeTasks = new Task[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allTasks.length; i++) {
            if (!allTasks[i].completed && !allTasks[i].slashed && block.timestamp <= allTasks[i].deadline) {
                activeTasks[currentIndex] = allTasks[i];
                currentIndex++;
            }
        }
        
        return activeTasks;
    }

    function getOverdueTasks(address _user) public view returns (Task[] memory) {
        Task[] memory allTasks = userTasks[_user];
        uint256 overdueCount = 0;
        
        // Count overdue tasks
        for (uint256 i = 0; i < allTasks.length; i++) {
            if (!allTasks[i].completed && !allTasks[i].slashed && block.timestamp > allTasks[i].deadline) {
                overdueCount++;
            }
        }
        
        // Create array of overdue tasks
        Task[] memory overdueTasks = new Task[](overdueCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 0; i < allTasks.length; i++) {
            if (!allTasks[i].completed && !allTasks[i].slashed && block.timestamp > allTasks[i].deadline) {
                overdueTasks[currentIndex] = allTasks[i];
                currentIndex++;
            }
        }
        
        return overdueTasks;
    }
}