import React, { useEffect, useRef, useState } from 'react'

const ItemMenu = ({ prefix, onEdit, onDelete }) => {
 const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className={`${prefix}-menu-wrap`} ref={ref}>
      <button className={`${prefix}-menu-btn`} onClick={() => setOpen(p => !p)} aria-label="More options">⋮</button>
      {open && (
        <div className={`${prefix}-dropdown`}>
          <div className={`${prefix}-dropdown__item`} onClick={() => { onEdit(); setOpen(false); }}>Edit education</div>
          <div className={`${prefix}-dropdown__item ${prefix}-dropdown__item--danger`} onClick={() => { onDelete(); setOpen(false); }}>Delete</div>
        </div>
      )}
    </div>
  );
}

export default ItemMenu