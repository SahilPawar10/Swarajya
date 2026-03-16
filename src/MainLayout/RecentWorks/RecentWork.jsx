import React from "react";
import "./recentwork.css";
import recent1 from "../../assets/heroImage.jpeg";
import recent2 from "../../assets/WhatsApp Image 2026-03-17 at 12.46.34 AM (1).jpeg";
import recent3 from "../../assets/WhatsApp Image 2026-03-17 at 12.46.30 AM.jpeg";
import recent4 from "../../assets/WhatsApp Image 2026-03-17 at 12.46.33 AM (2).jpeg";
import { Link } from "react-router-dom";

function RecentWork() {
  return (
    <section id="recents">
      <div className="recent-container">
        <Link to="/recent-work" className="recent-card">
          <div className="recent-image-grid">
            <img src={recent1} alt="Recent work 1" />
            <img src={recent2} alt="Recent work 2" />
            <img src={recent3} alt="Recent work 3" />
            <img src={recent4} alt="Recent work 4" />
          </div>

          <div className="recent-content">
            <h2>शिवजयंती उत्सव वर्ष ११ वे 🚩</h2>

            <p>
              स्वराज्य ग्रुप अंधारवाडी, आंब्रग तर्फे छत्रपती शिवाजी महाराज जयंती
              निमित्त वक्तृत्व स्पर्धा तसेच स्पोर्ट्स किटचे वाटप कार्यक्रम
              उत्साहात आयोजित करण्यात आला. सामाजिक उपक्रम म्हणून जिल्हा परिषद
              शाळा आंब्रग व अंधारवाडी येथील विद्यार्थ्यांना स्पोर्ट्स किट
              देण्यात आले.
            </p>

            <span className="read-more">Read More →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default RecentWork;
