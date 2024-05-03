import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next'




const InfoVendedor = ({ post }) => {
  const { auth, languagee } = useSelector(state => state);

  const { t } = useTranslation();

  const [visibility, setVisibility] = useState({
    showNormalLocation: false,
    showNormalName: false,
    showNormalEmail: false,
    showNormalPhone: false
  });


  const canToggleLocation = (auth.user._id === post.user._id || auth.user.role === 'admin');
  const canToggleName = (auth.user._id === post.user._id || auth.user.role === 'admin');
  const canToggleEmail = (auth.user._id === post.user._id || auth.user.role === 'admin');
  const canTogglePhone = (auth.user._id === post.user._id || auth.user.role === 'admin');

  // Obtén el estado de visibilidad desde el localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem(`postVisibility-${post._id}`);
    if (savedVisibility !== null) {
      setVisibility(JSON.parse(savedVisibility));
    }
  }, [post._id]);

  // Actualiza el estado de visibilidad en el localStorage
  useEffect(() => {
    localStorage.setItem(`postVisibility-${post._id}`, JSON.stringify(visibility));
  }, [post._id, visibility]);

  // Funciones para manejar la visibilidad
  const handleToggle = (field) => {
    if (canToggleLocation || canToggleName || canToggleEmail || canTogglePhone) {
      setVisibility(prevVisibility => ({
        ...prevVisibility,
        [field]: !prevVisibility[field]
      }));
    }
  };

  const getVisibilityStyle = (field) => {
    return visibility[field] ? {} : { filter: 'blur(5px)' };
  };

  return (
    <div className="card mb-4">
      <div className="card-body" style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
        <h4 className="card-title" style={{ color: '#333', borderBottom: '2px solid #FFD700', paddingBottom: '10px' }}>
          <i className="fas fa-user mr-2" style={{ fontSize: '24px', color: '#F73D06' }} />    {t("Contact & Coordonnés", { lng: languagee.language })}
        </h4>


        <div className="d-flex align-items-center mb-2">
          <div>
            <i className="fas fa-map-marker-alt mr-2" style={{ fontSize: '24px', color: '#FF5733' }} />
          </div>
          <div className="contact-info">
            <p className="card-text mb-0" style={{ marginRight: '15px', ...getVisibilityStyle('showNormalLocation') }}>
              {post.wilaya} {post.commune}
            </p>
          </div>
          {canToggleLocation && (auth.user._id === post.user._id || auth.user.role === 'admin') && (
            <button onClick={() => handleToggle('showNormalLocation')} style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#E74C3C', color: 'white', border: 'none' }}>
              {visibility.showNormalLocation ? 'Masquer' : 'Afficher'}
            </button>
          )}
        </div>

        {/* Name */}
        <div className="d-flex align-items-center mb-2">
          <div>
            <i className="fas fa-user mr-4" style={{ fontSize: '24px', color: '#5DADE2' }} />
          </div>
          <div className="contact-info">
            <p className="card-text mb-0" style={{ marginRight: '15px', ...getVisibilityStyle('showNormalName') }}>
              {post.nomprenom}
            </p>
          </div>
          {canToggleName && (auth.user._id === post.user._id || auth.user.role === 'admin') && (
            <button onClick={() => handleToggle('showNormalName')} style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#E74C3C', color: 'white', border: 'none' }}>
              {visibility.showNormalName ? 'Masquer' : 'Afficher'}
            </button>
          )}
        </div>

        {/* Phone */}
        <div className="d-flex align-items-center">
          <div>
            <i className="fas fa-phone mr-4" style={{ fontSize: '24px', color: '#F4D03F' }} />
          </div>
          <div className="contact-info">
            <p className="card-text mb-0" style={{ marginRight: '15px', ...getVisibilityStyle('showNormalPhone') }}>
              {post.telefono}
            </p>
          </div>
          {canTogglePhone && (auth.user._id === post.user._id || auth.user.role === 'admin') && (
            <button onClick={() => handleToggle('showNormalPhone')} style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#E74C3C', color: 'white', border: 'none' }}>
              {visibility.showNormalPhone ? 'Masquer' : 'Afficher'}
            </button>
          )}
        </div>

        {/* Email */}
        <div className="d-flex align-items-center">
          <div>
            <i className="fas fa-envelope mt-3 mr-4" style={{ fontSize: '24px', color: '#E74C3C' }} />
          </div>
          <div className="contact-info">
            <p className="card-text mb-0" style={{ marginRight: '15px', ...getVisibilityStyle('showNormalEmail') }}>
              {post.email}
            </p>
          </div>
          {canToggleEmail && (auth.user._id === post.user._id || auth.user.role === 'admin') && (
            <button onClick={() => handleToggle('showNormalEmail')} style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: '#E74C3C', color: 'white', border: 'none' }}>
              {visibility.showNormalEmail ? 'Masquer' : 'Afficher'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoVendedor;
