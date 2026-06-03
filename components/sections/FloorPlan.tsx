import { SectionLabel } from '@/components/ui/SectionLabel';
import { FloorPlanTabs } from '@/components/islands/FloorPlanTabs';

export function FloorPlan() {
  return (
    <section className="floor-plan section-padding bg-light" id="floor-plan">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Location &amp; Floor Plan</SectionLabel>
          <h2 className="section-title">Marbella Twin Towers</h2>
          <p className="section-subtitle">Explore our thoughtfully designed spaces</p>
        </div>
        <FloorPlanTabs
          panels={[
            {
              id: 'location',
              label: 'Location',
              content: (
                <>
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.828580677721!2d76.7647!3d30.7046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzE2LjYiTiA3NsKwNDUnNDkuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Marbella Twin Towers location"
                    />
                  </div>
                  <div className="location-info">
                    <h3>Prime Location</h3>
                    <p><strong>Address:</strong> New Chandigarh, Mullanpur</p>
                    <p><strong>Landmark:</strong> 0 km from Chandigarh, direct access from Madhya Marg road extension</p>
                    <ul className="location-features">
                      <li>5 mins from Chandigarh City Centre</li>
                      <li>Close to International Airport</li>
                      <li>Near upcoming Metro Station</li>
                      <li>Surrounded by premium developments</li>
                    </ul>
                  </div>
                </>
              ),
            },
            {
              id: 'floor-plan-4',
              label: '4 BHK + Servant',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/floorplan-4bhk.jpg"
                      alt="4 BHK Floor Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>4 BHK + Servant Room</h3>
                    <ul>
                      <li>Super Area: 3,200 sq. ft.</li>
                      <li>4 Bedrooms + Multipurpose Room</li>
                      <li>Servant Room + Store</li>
                      <li>Pooja Room</li>
                      <li>3 Balconies with City View</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Enquire Now</a>
                  </div>
                </div>
              ),
            },
            {
              id: 'floor-plan-5',
              label: '5 BHK + Servant',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/floorplan-5bhk.jpg"
                      alt="5 BHK Floor Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>5 BHK + Servant Room</h3>
                    <ul>
                      <li>Super Area: 4,200 sq. ft.</li>
                      <li>5 Bedrooms + Multipurpose Room</li>
                      <li>Servant Room + Store</li>
                      <li>Pooja Room</li>
                      <li>4 Balconies with Panoramic View</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Enquire Now</a>
                  </div>
                </div>
              ),
            },
            {
              id: 'master-plan',
              label: 'Master Plan',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/master-plan.jpg"
                      alt="Master Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>Master Plan</h3>
                    <ul>
                      <li>Total Area: 4.36 Acres</li>
                      <li>Tower A: 33 Floors</li>
                      <li>Tower B: 33 Floors</li>
                      <li>Clubhouse: 50,000 sq. ft.</li>
                      <li>Landscaped Gardens &amp; Open Spaces</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Download Brochure</a>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
