import axios from "axios";
import { useState } from "react";
import Message from "./Message";

export default function CustomerHandleMessages() {
  const [Model, setModel] = useState(false);
  const [deleteMessage , setDeleteMessage] = useState(false);
  async function deleteAllMessagesFromAdmin() {
    try {
      const response = await axios.delete(import.meta.env.VITE_SERVER_CUSTOMERCARE_LINK+"/api/messages/deleteAll");
      if(response){
        setModel(false);
        setDeleteMessage(true)
        setTimeout(()=>{
            setDeleteMessage(false)
        },1000)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
       {deleteMessage && <Message title={'Message Deleted'} subtitle={'Successfully'} />}
      <div className="allMessages-btn">
        <div className="msg-wrapper-btn">

        <button
          className="message-deleteAll-btn"
          onClick={() => setModel(true)}
          >
          Delete All Chats Messages From Your Side?
        </button>
        </div>
      </div>
      {Model && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={()=> setModel(false)}>&times;</span>
            <div className="icon-box">&#x2716;</div>
            <div className="modal-header">
              <h4>Are you sure?</h4>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-wrapper btn-secondary" onClick={()=> setModel(false)}>Cancel</button>
              <button type="button" className="btn-wrapper btn-danger" onClick={()=>deleteAllMessagesFromAdmin()}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
