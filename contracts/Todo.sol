// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Todo{
  uint public taskCount=0;
mapping(uint => task) public tasks;
  struct task{
      uint id;
      string cotent;
  }
   event taskCreated(
        uint id,
        string content
      
    );
    
  function createTask(string memory _content) public {
        // Require valid content
      //  require(bytes(_content).length > 0);
        // Increment the post count
        taskCount++;
        // Create the post
        tasks[taskCount] = task(taskCount ,_content);
        // Trigger event
        emit taskCreated(taskCount, _content);
    }
  
 
}