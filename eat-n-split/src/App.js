import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showTab, setShowTab] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  function handleSelection(friend) {
    setSelectedFriend(selectedFriend?.id === friend.id ? null : friend);
    setShowTab(false);
  }

  function handleAddFriend() {
    setShowTab(!showTab);
    setSelectedFriend(null);
  }

  function onSplit(exp) {
    console.log(exp);
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + exp }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
          friends={friends}
        />
        {showTab && <FormAddFriend friends={friends} setFriends={setFriends} />}
        <Button onClick={() => handleAddFriend()}>
          {showTab ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill friend={selectedFriend} onSplit={onSplit} />
      )}
    </div>
  );
}

function FriendsList({ onSelection, friends, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          onClick={onSelection}
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onClick, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onClick(friend)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ friends, setFriends }) {
  const [name, setName] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };

    setName("");
    setImage("https://i.pravatar.cc/48");
    setFriends([...friends, newFriend]);
    console.log(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, onSplit }) {
  const [total, setTotal] = useState("");
  const [myExp, setMyExp] = useState("");
  const [payer, setPayer] = useState("user");

  function handleSplitBill(e) {
    e.preventDefault();
    console.log(payer);

    if (!total || !myExp) return;
    if (payer === "user") {
      onSplit(total - myExp);
    } else {
      onSplit(-myExp);
    }
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />

      <label>🧔 Your expense</label>
      <input
        type="text"
        value={myExp}
        onChange={(e) =>
          setMyExp(
            Number(e.target.value) > total ? myExp : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {friend.name}'s expense</label>
      <input type="text" value={total - myExp} disabled />

      <label>💵 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
