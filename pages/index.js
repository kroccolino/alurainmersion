import config from "./config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";


function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor:"red"
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
            
    return (
        <>
        <CSSReset />
    <div style={estilosDaHomePage}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <Header></Header>
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}/>
    </div>
        </>
    )
  }
  
  export default HomePage


  const StyledHeader = styled.div`
  img {
      with: 80px;
      height: 80px;
      border-radius: 50%;
  }
  .user-info {
      display: flex;
      align-items: center;
      withd: 100%;
      padding: 64px 32px;
      gap: 16px;
  }
  `
  const StyledBanner = styled.div`
      background-color: blue; 
      height: 230px;
      background-image: url(${config.banner})
  `;
  function Header(){
      return (<StyledHeader>
          <StyledBanner />
          {/* <img src="banner"/> */}
          <section className="user-info">

          <img src={`https://github.com/${config.github}.png`}/>
          <div>
              <h2>

          {config.name}
              </h2>
          <p>
          {config.job}
          </p>
          </div>
          </section>
          

          </StyledHeader>)
  }
  function Timeline({searchValue, ...props}){
      
      const playlistsNames = Object.keys(props.playlists)

      return(
         <StyledTimeline>
          {playlistsNames.map((playlistName) => {
              const videos = props.playlists[playlistName];
              return  (
                 <section key={playlistName}>
                   <h2>{playlistName}</h2>
                     <div>
         
                         {videos.filter((video) => {
                             const titleNormalized = video.title.toLowerCase();
                             const searchValueNormailized = searchValue.toLowerCase();
                            return titleNormalized.includes(searchValueNormailized)
                         }).map((video )=>{
                            return (
                             <a key={video.url} href={video.url}>
                             <img src={video.thumb} />
                             <span>
                                {video.title}
                            </span>
                         </a>
                         )  
                   }) }
                </div>
            </section>

        )
    })}
    </StyledTimeline>
    )
}