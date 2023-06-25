
import './App.css';
import ShowBucket from "./components/ShowBucket";
import UploadJolsBucket from "./components/UploadJolsBucket";
/* import DownloadImages from "./components/DownloadImages"; */

const App = () => {
  return(
      <div className="App">
        <header>
          <UploadToBucket />
          <ShowBucket />
{/*           <DownloadImages /> */}
        </header>
    </div>
   );
  }
  
  export default App;
