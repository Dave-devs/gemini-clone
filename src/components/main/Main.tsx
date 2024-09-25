import { useContext } from "react";
import { images } from "../../contants/images";
import "./Main.css";
import { Context } from "../../context/Context";

function Main() {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const {
    onSent,
    input,
    setInput,
    recentPropmt,
    loading,
    showResult,
    resultData,
  } = context;

  return (
    <div className="main">
      {/* Main Header Row Section */}
      <div className="nav">
        <p>Gemini</p>
        <img src={images.profileImage} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            {/* Main Greeting Section */}
            <div className="greet">
              <p>
                <span>Hello, Oreoluwa</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            {/* Cards Section */}
            <div className="cards">
              <div className="card">
                <p>Write a podcat description for a new type of toothbrush</p>
                <img src={images.write} alt="" />
              </div>
              <div className="card">
                <p>What are tips to improve public speaking skills</p>
                <img src={images.lightBulb} alt="" />
              </div>
              <div className="card">
                <p>Help me with planning a European road trip</p>
                <img src={images.briefcase} alt="" />
              </div>
              <div className="card">
                <p>Create an image of an intergalatic event</p>
                <img src={images.write} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {/* Result Title & User Icon */}
            <div className="result-title">
              <img src={images.profileImage} alt="" />
              <p>{recentPropmt}</p>
            </div>
            {/* Prompt Response */}
            <div className="result-data">
              <img src={images.rhombus} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              value={input}
              onChange={(newValue) => setInput(newValue.target.value)}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={images.image} alt="" />
              <img src={images.mic} alt="" />
              {input.length > 0 && (
                <img onClick={() => onSent()} src={images.send} alt="" />
              )}
            </div>
          </div>
          <div className="bottom-info-container">
            <p className="bottom-info-one">
              Gemini may display inaccurate info, including about people, so
              double-check its responses.
            </p>
            <p className="bottom-info-two">Your privacy and Gemini Apps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
