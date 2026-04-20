import React from 'react';


function FAQS() {

  return (
    <>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      What is Quercus Oak Stays?
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Quercus Oak Stays is A Premium Hospitality Group Offering A Curated Collection Of Hotels, Luxury Villas, Apartments, and Unique Stays Across Popular Destinations. We Focus on delivering Comfortable, Personalized, and Memorable Travel Experiences.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      What types of Properties do you Offer?
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      We offer a wide range of Stays including Luxury Villas, Boutique Hotels, Heritage Properties, Apartments, Cottages, and Nature Retreats to suit different Travel Preferences and Budgets.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Are your Properties suitable for Families and Groups?
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Yes, many of Our Villas and Properties are ideal for Families, Corporate Groups, and Friends Traveling Together, Offering Spacious Rooms, Private Amenities, and Comfortable Common Areas.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFour">
      <button className="accordion-button collapsed font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      How can I Book a Stay With Quercus Oak Stays?
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      You can easily browse and book your Preferred Property through our Website or by Contacting our Support Team. Our Booking Process is Simple, Secure, And Designed for a Hassle-Free Experience.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFive">
      <button className="accordion-button collapsed font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFour">
      What Amenities can I Expect During My Stay?
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Our Properties typically offer Modern Amenities such as High-Speed WiFi, Housekeeping, Smart TVs, Fully Equipped Kitchens (In Select Stays), Parking,and More. Premium Stays may Include Pools, Gardens, and Concierge Services.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingSix">
      <button className="accordion-button collapsed font-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseFour">
      Is Customer Support Available During the Stay?
      </button>
    </h2>
    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      Absolutely. Our Support Team is available to assist you Before, During, and After your Stay to Ensure a Smooth and Enjoyable Experience.
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default FAQS;