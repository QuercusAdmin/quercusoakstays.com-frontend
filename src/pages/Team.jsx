import React, { useState,useEffect } from "react";
import Header2 from '../components/Header2.jsx'
import Footer from '../components/Footer.jsx'

const TeamDummy = [
  {
    "id": 1,
    "name": "Atinder Pal Singh",
    "title": "Founder & Director",
    "experience": "8",
    "image": "",
    "socials": {
      "linkedin": "#",
      "instagram": "#",
      "facebook":"#"
    }
  },
  {
    "id": 2,
    "name": "Varun Gupta",
    "title": "Founder & Director",
    "experience": "8",
    "image": "",
    "socials": {
      "linkedin": "#",
      "instagram": "#",
      "facebook":"#"
    }
  },
    {
    "id": 3,
    "name": "Mahipal Singh",
    "title": "Founder & Director",
    "experience": "5",
    "image": "",
    "socials": {
      "linkedin": "#",
      "instagram": "#",
      "facebook":"#"
    }
  },
  {
    "id": 4,
    "name": "Swaroop Singh Bhati",
    "title": "Founder & Director",
    "experience": "7",
    "image": "",
    "socials": {
      "linkedin": "#",
      "instagram": "#",
      "facebook":"#"
    }
  }
];

function Team() {

  const [team,setTeam]=useState([])

    useEffect(() => {

      setTeam(TeamDummy)
      const element = document.documentElement;
      element.style.scrollBehavior = 'smooth';
      element.scrollTo(0, 0);
    }, []);

  return (
    <>
      <Header2/>
      <div>
      {/* Team Start */}
      <div className="container-xxl py-5 padding-top-custom">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Our Team
          </h6>
          <h1 className="mb-5">Meet Our Amazing Team</h1>
        </div>
        <div className="row g-4">

          {team.map((value, i) => (

    
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`0.${i+1}s`}>
              <div className="team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={value.image!=="" ? value.image : require(`../assets/img/team-3.jpg`)} alt="" />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-19px" }}
                >
                  <a className="btn btn-square mx-1" href={value.socials.linkedin}>
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a className="btn btn-square mx-1" href={value.socials.facebook}>
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href={value.socials.instagram}>
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="text-center p-4">

                  <h5 className="mb-1">{value.name}</h5>
                  <div className="mb-1">
                    <small className="text-muted fw-bold">
                      {value.experience}+ Years Experience
                    </small>
                  </div>
                  <div>
                    <small className="text-primary text-uppercase fw-bold">
                      {value.title}
                    </small>
                  </div>
                </div>
              </div>
            </div>

          ))}

        </div>
      </div>
    </div>
    {/* Team End */}
    </div>
  <Footer />
    </>
  )
}


export default Team
