
import './App.css';
import ShowBucket from "./components/ShowBucket";
import UploadToJolsBucket from "./components/UploadToJolsBucket";

const App = () => {
  return(
      <div className="App">
        <header>
          <UploadToJolsBucket />
          <ShowBucket />
        </header>
    </div>
   );
  }
  
  export default App;
