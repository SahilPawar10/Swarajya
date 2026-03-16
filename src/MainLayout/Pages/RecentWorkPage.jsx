import React from "react";
import withLayout from "..";
import "./recentWorkPage.css";
import Banner from "../Components/Banner";
import banner from "../../assets/recentworkbanner.jpeg";
import bannerMob from "../../assets/WhatsApp Image 2026-03-17 at 12.46.35 AM (1).jpeg";
import heroImage from "../../assets/heroImage.jpeg";

function RecentWorkPage() {
  const whatsappContext = require.context(
    "../../assets",
    false,
    /^\.\/[Ww]hats[Aa]pp Image.*\.jpeg$/,
  );

  const whatsappImages = whatsappContext
    .keys()
    .filter((key) => key.includes("2026-03-17"))
    .sort()
    .map((key) => whatsappContext(key));

  const galleryImages = whatsappImages;

  return (
    <div className="recent-work-page">
      <Banner
        image={banner}
        mob_image={bannerMob}
        submenu1="Our Work"
        submenu2="Recent Work"
      />
      <div className="contenr-1200">
        <div className="recent-work-hero">
          <div className="recent-work-image">
            {heroImage ? <img src={heroImage} alt="Recent work" /> : null}
          </div>
          <div className="recent-work-text">
            <h2>आमचे अलीकडचे कार्य</h2>
            <p>
              <b>
                स्वराज्य ग्रुप अंधारवाडी, आंब्रग तर्फे छत्रपती शिवाजी महाराज
                जयंती निमित्त वक्तृत्व स्पर्धा तसेच स्पोर्ट्स किटचे वाटप
                कार्यक्रम उत्साहात आयोजित करण्यात आला. स्वराज्य ग्रुपच्या ११
                व्या वर्धापन दिनानिमित्त, ग्रुपतर्फे सामाजिक उपक्रम म्हणून
                जिल्हा परिषद शाळा आंब्रग व जिल्हा परिषद शाळा अंधारवाडी येथील
                सर्व विद्यार्थ्यांना स्पोर्ट्स किटचे वाटप करण्यात आले. या
                उपक्रमामुळे विद्यार्थ्यांना क्रीडाप्रती प्रोत्साहन मिळावे हा
                उद्देश होता. या कार्यक्रमास गावाच्या सरपंच सौ. प्रियांका सुरज
                घाडगे, उपसरपंच संजय कदम, गावचे पोलिस पाटील संतोष मुळीक, शालेय
                व्यवस्थापन समितीचे अध्यक्ष राजाराम पवार, तसेच शेख सर, पवार सर,
                आनंदा गुरुजी, सुरज घाडगे, श्रीरंग पवार, मारुती पवार (जीपवाले),
                नितीन सर आणि प्रदीप सर हे मान्यवर उपस्थित होते. यावेळी गावातील
                इतर ग्रामस्थ व मोठ्या संख्येने नागरिक उपस्थित होते. तसेच गावातील
                सर्व महिला बचत गटांच्या अध्यक्षा व त्यांच्या गटांचा सन्मान
                करण्यात आला. या कार्यक्रमासाठी स्वराज्य ग्रुपचे अध्यक्ष विशाल
                निकम व मार्गदर्शक गोविंदा निकम यांच्या मार्गदर्शनाखाली ग्रुपच्या
                सर्व सदस्यांनी परिश्रम घेऊन कार्यक्रम यशस्वी केला. या सामाजिक
                उपक्रमामुळे गावात उत्साहाचे व प्रेरणादायी वातावरण निर्माण झाले.
              </b>
            </p>
          </div>
        </div>

        <div className="recent-work-gallery">
          <h3>फोटो गॅलरी</h3>
          <div className="recent-work-grid">
            {galleryImages.map((src, index) => (
              <div className="recent-work-card" key={index}>
                <img src={src} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(RecentWorkPage);
