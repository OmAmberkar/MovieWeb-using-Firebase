/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const [docList, setDocList] = useState([]);
  const docsRefernce = collection(db, 'myDocs');

  const [docName, setDocName] = useState('');
  const [content, setContent] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [updateContent, setUpdateContent] = useState('');

  const getMovieList = async () => {
    try {
      const data = await getDocs(docsRefernce);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDocList(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const submitDoc = async () => {
    if (!docName || !content) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await addDoc(docsRefernce, {
        docName: docName,
        content: content,
        acceptPolicy: acceptPolicy,
      });
      // alert("Document added successfully!");
      setDocName('');
      setContent('');
      setAcceptPolicy(false);
      getMovieList(); // Refresh data
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error adding document: " + error.message);
    }
  };

  const DeleteDoc = async (id) => {
    const Docs = doc (db,"myDocs",id)
    await deleteDoc(Docs);
    getMovieList(); // Refresh data after deletion
  }  

  const changeDoc = async (id) => {
    const Docs = doc (db,"myDocs",id)
    await updateDoc(Docs, { content:updateContent });
    getMovieList(); // Refresh data after deletion
  }

  return (
    <div className='app-container'> {/* Main container for the whole app */}
      <h1>Hello, it's me! OMi</h1>
      <h5>Checking my working with Firebase </h5>
      <div className='auth-section'> {/* Class for the auth component container */}
        <Auth />
      </div>

      <div className='input-section'> {/* Class for the document input form */}
        <input
          type="text"
          placeholder='Document Name...'
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />
        <input
          type="text"
          placeholder='Content...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={acceptPolicy}
            onChange={(e) => setAcceptPolicy(e.target.checked)}
          />
          Accept the Policies
        </label>
        <button
          onClick={submitDoc}
          className='submit-button'
        >
          Submit Doc
        </button>
      </div>

      <div className='doc-list-container'> {/* Class for the grid of documents */}
        {docList.map((doc) => (
          <div
            key={doc.id}
            className='doc-item'
          >
            <h2>{doc.docName}</h2>
            <p>{doc.content}</p>
            <p className={`doc-policy-status ${doc.acceptPolicy ? '' : 'not-accepted'}`}>
              {doc.acceptPolicy ? "Policy Accepted" : "Policy Not Accepted"}
            </p>

            <button className='auth-logout-button' onClick={()=>DeleteDoc(doc.id)}>Delete Document</button>

            <input type="text" placeholder='some changes....' className='changes' onChange={(e) => setUpdateContent(e.target.value)}/>
            <button className='auth-primary-button' onClick={() => changeDoc(doc.id)}>Update Content</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;