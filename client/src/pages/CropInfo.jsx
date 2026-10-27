import { useParams } from 'react-router-dom';
import cropsData from '../data/crops.json';
import UserNavbar from '../components/UserNavbar';
import { FiArchive, FiCalendar, FiClock, FiTrendingUp, FiCloud, FiShield } from 'react-icons/fi';
import { GiEarthAmerica } from 'react-icons/gi';

export default function CropInfo() {
  const { id } = useParams();
  const crop = cropsData.find(c => c.id === parseInt(id));

  if (!crop) return <div><UserNavbar/><p style={{textAlign:'center',marginTop:40}}>Crop not found</p></div>;

  return (
    <div className="crop-info-page">
      <UserNavbar />
      <img src={crop.imageUrl} alt={crop.name} className="crop-hero-img" onError={e=>e.target.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} />
      <div className="crop-title-wrap">
        <div style={{background:'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',borderRadius:12,padding:'20px 32px',marginBottom:16}}>
          <h2 style={{color:'#fff',fontWeight:800,fontSize:'2rem'}}>{crop.name}</h2>
        </div>
      </div>

      {/* Crop Details */}
      <div className="crop-detail-card">
        <h3>Crop Details</h3>
        <div className="crop-detail-grid">
          {[
            { icon:<FiArchive/>, label:'Scientific Name', val:crop.scientificName },
            { icon:<FiClock/>, label:'Growth Period', val:crop.growthPeriod },
            { icon:<FiCalendar/>, label:'Season', val:crop.season },
            { icon:<FiTrendingUp/>, label:'Sowing Time', val:crop.sowingTime },
            { icon:<FiCloud/>, label:'Climate', val:crop.climate },
            { icon:<FiShield/>, label:'Harvest Time', val:crop.harvestTime },
            { icon:<GiEarthAmerica/>, label:'Soil Type', val:crop.soilType },
          ].map((item,i) => (
            <div className="crop-detail-item" key={i}>
              <div className="crop-detail-icon">{item.icon}</div>
              <div>
                <h5>{item.label}</h5>
                <p>{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pesticides & Fertilizers */}
      <div className="pest-fert-grid">
        <div className="pest-card">
          <h4>🗑️ Recommended Pesticides</h4>
          {crop.pesticides.map(p => <span key={p} className="tag tag-red">{p}</span>)}
        </div>
        <div className="fert-card">
          <h4>📈 Recommended Fertilizers</h4>
          {crop.fertilizers.map(f => <span key={f} className="tag tag-blue">{f}</span>)}
        </div>
      </div>
    </div>
  );
}
