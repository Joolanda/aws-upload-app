
import './App.css';
import ShowBucket from "./components/ShowBucket";
import UploadToJolsBucket from "./components/UploadToJolsBucket";
import DownloadImages from "./components/DownloadImages";

const App = () => {
  return(
      <div className="App">
        <header>
          <UploadToJolsBucket />
          <ShowBucket />
          <DownloadImages />
        </header>
    </div>
   );
  }
  
  export default App;
