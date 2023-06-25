
import './App.css';
import ShowBucket from "./components/ShowBucket";
import UploadToBucket from "./components/UploadToBucket";

const App = () => {
  return(
      <div className="App">
        <header>
          <UploadToBucket />
          <ShowBucket />
        </header>
    </div>
   );
  }
  
  export default App;
