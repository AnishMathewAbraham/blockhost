// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Sample { 
    string public  str="";
    uint public totalEmployees=0;
    struct employee{
      uint empid;
      uint salary;
      string name;
    }
    mapping (uint=>employee) public employees;
    function saveStr(string memory _a) public{
      str=_a;  
    }
    function addEmployee(uint _salary,string memory _name) public{
      totalEmployees++;
      employees[totalEmployees]=employee(totalEmployees,_salary,_name);
    }
  
}