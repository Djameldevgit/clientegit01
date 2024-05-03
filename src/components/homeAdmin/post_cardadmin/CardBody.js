
import Admincarousel from '../../Carouselss/Admincarousel';

const CardBody = ({ post, theme }) => {



    return (
        <div className="card_body">
            <div
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>
                <span style={{ display: 'block', margin: '0px 0' }}>
                    <div className="alert alert-info" role="alert" style={{ background: '#d1e7f7', borderRadius: '15px', padding: '7px', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-user-cog" style={{ fontSize: '24px', marginRight: '10px', color: '#007bff' }}></i>
                        <p style={{ fontSize: '16px', margin: '0', color: '#333' }}>{post.content}</p>
                    </div>
                </span>





            </div>
            {
                post.images.length > 0 && <Admincarousel images={post.images} id={post._id} />
            }
        </div>
    )
}

export default CardBody
