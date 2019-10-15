import {useState, useEffect} from 'react';
import randomstring from 'randomstring';
import fetch from 'isomorphic-unfetch';

const Index = ({ sessions }) => {
  const [sessionId, setSessionId] = useState(randomstring.generate(7))
  const [host, setHost] = useState(null);
  const [secondsToAdd, setSecondsToAdd] = useState(0);
  const [sessionInfo, setSessionInfo] = useState({ offset: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const prefix = `https://${host}/api/session/${sessionId}`;
  const urls = {
    timestamp: `${prefix}/timestamp`,
    addSeconds: `${prefix}/add/`,
    session: `${prefix}`
  }

  useEffect(() => {
    setHost(location.host);
  }, []);

  const addSecondsToAddValue = (value) => () => {
    setSecondsToAdd(secondsToAdd * 1 + value)
  }
  
  const handleSessionIdChanged = (event) => {
    event.preventDefault();
    setSessionId(event.target.value);
  }

  const handleSecondsToAddChanged = (event) => {
    event.preventDefault();
    setSecondsToAdd(event.target.value);
  }

  const refresh = async () => {
    setIsLoading(true);
    const response = await fetch(urls.session);
    const data = await response.json();

    setSessionInfo(data);
    setIsLoading(false);
  }

  const addSeconds = async () => {
    setIsLoading(true);
    await fetch(`${urls.addSeconds}${secondsToAdd}`);
    await refresh();
  }

  const reset = async () => {
    setIsLoading(true);
    await fetch(`${urls.addSeconds}-${sessionInfo.offset}`);
    await refresh();
  }

  return !host ? null : (
    <div>
      <p>
        Session ID: {' '}
        <input type="text" 
          onChange={handleSessionIdChanged} 
          value={sessionId}
        />
      </p>
      <p>Mock timeserver <a target="_blank" rel="noopener noreferrer" href={urls.timestamp}>Link</a></p>
      <p>---</p>
      <p>
        <input type="number" 
          value={secondsToAdd} 
          onChange={handleSecondsToAddChanged}
        /> seconds 
      </p>
      <button onClick={addSecondsToAddValue(60)}>+1 minute</button>
      <button onClick={addSecondsToAddValue(60 * 60)}>+1 hour</button>
      <button onClick={addSecondsToAddValue(60 * 60 * 24)}>+1 day</button>
      <p>---</p>
      {isLoading ? null : <p>
        <button onClick={addSeconds}>Add</button>
        <button onClick={reset}>Reset</button>
        <button onClick={refresh}>Refresh</button>
      </p>}
      <p>{isLoading ? 'Loading...' : JSON.stringify(sessionInfo)}</p>
    </div>
  )
}

Index.getInitialProps = async () => {
  

  return {  }
}

export default Index
