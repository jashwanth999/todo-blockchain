import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";
import Todo from "./abis/Todo.json";
function App() {
  const [account, setAccount] = useState("");
  const [todo, setTodo] = useState();
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchainData = async () => {
    setLoading(true);
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    // Network data

    if (networkId) {
      const todo = new web3.eth.Contract(
        Todo.abi,
        Todo.networks[networkId].address
      );

      setTodo(todo);
      const count = await todo.methods.taskCount().call();

      setTaskCount(count);
      // console.log(count);
      const list = tasks;
      for (var i = 1; i <= count; i++) {
        const task = await todo.methods.tasks(i).call();
        list.push(task);
      }
      setTasks(list);
      setLoading(false);
    } else {
      alert("not deployed");
    }
  };
  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData();
  }, []);
  const add = async () => {
    await todo.methods.createTask(value).send({ from: account });
  };
  //console.log(tasks);

  return (
    <div className="App">
      <h3>{account}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter"
      />

      <button onClick={add}>add</button>
      {taskCount}
      {tasks.map((i, key) => (
        <h3 key={key}>{i.cotent}</h3>
      ))}
    </div>
  );
}

export default App;
