import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TextEditor = (props) => {
  const { bodyValue, setBodyValue } = props;

  const handleChange = (content) => {
    setBodyValue(content);
  }
  
  return <SunEditor 
            value={bodyValue} 
            onChange={handleChange} 
            height="320px" 
            placeholder="Please type here..."
          />
};

export default TextEditor;
