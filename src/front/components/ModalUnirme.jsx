export const ModalUnirme = ({show,title,closeModal,unirme}) => {

if(!show) return null;
    return (
        <div className="modal" tabIndex='-1'  style={{ display:show? 'block':none}} id="miModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title title">{title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-footer d-flex justify-content-end gap-2">
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"onClick={closeModal}>Cancelar</button>
        <button type="submit" className="btn btnAgregar" onClick={unirme}>Aceptar</button> */}
        <button type="submit" className="btn btnAgregar" onClick={unirme}>Guardar</button>
      </div>
    </div>
  </div>
</div>
    );
};