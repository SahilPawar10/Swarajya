import React from "react";
import "./vision.css";
import slider1 from "../../assets/WhatsApp Image 2023-11-07 at 9.16.39 PM.jpeg";
import slider2 from "../../assets/kirtan.jpeg";
import slider3 from "../../assets/haldiKunku.jpeg";

function Vision() {
  return (
    <div id="vision">
      <div className="vision-text">
        <div className="heading">
          <h2>Swarajya: Pioneering Joyful Community Empowerment</h2>
        </div>
        <div className="heading2">
          <h2>Enriching Lives Since Day One</h2>
        </div>
      </div>
      <div className="vision-images">
        <div className="vision-type type1">
          <h3>Health</h3>
          <img src={slider1} alt="" />
          <div className="type-header">
            {/* Education 0.32 million people reached */}
            <h4>Health 103.7 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type type2">
          <h3>Education</h3>
          <img src={slider2} alt="" />
          <div className="type-header">
            <h4> Education 0.32 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type">
          <h3>Livelihood</h3>
          <img src={slider3} alt="" />
          <div className="type-header">
            <h4> Livelihood 0.88 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="vision-type type3">
          <h3>Activities</h3>
          <img src={slider1} alt="" />
          <div className="type-header">
            <h4> Disaster Relief 13 million people reached</h4>
          </div>
          <div className="type-text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vision;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Masonry from "@mui/lab/Masonry";
// import { styled } from "@mui/material/styles";

// const Label = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(0.5),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
// }));

// export default function ImageMasonry() {
//   return (
//     <Box sx={{ width: 500, minHeight: 829 }}>
//       <Masonry columns={3} spacing={2}>
//         {itemData.map((item, index) => (
//           <div key={index}>
//             <Label>{index + 1}</Label>
//             <img
//               srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
//               src={`${item.img}?w=162&auto=format`}
//               alt={item.title}
//               loading="lazy"
//               style={{
//                 borderBottomLeftRadius: 4,
//                 borderBottomRightRadius: 4,
//                 display: "block",
//                 width: "100%",
//               }}
//             />
//           </div>
//         ))}
//       </Masonry>
//     </Box>
//   );
// }

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
//     title: "Snacks",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
//     title: "Tower",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d",
//     title: "Tree",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1627000086207-76eabf23aa2e",
//     title: "Camping Car",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7",
//     title: "Mountain",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ];
