import {Button, Modal, Form, fullscreen} from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';


function MapBox(props) {

    const [viewport, setViewport] = React.useState({
        longitude: 107.574414,
        latitude: -6.865321,
        zoom: 8,
        width: 760,
        height: 500,
    });

    const loc = window.location.href;
    
    const info = ()=>(
        <div className="mapInfo" style={{backgroundColor:'white', width: 300, padding:' 20px 10px', margin:'10px 10px'}}>
            <h5 style={{marginLeft:10}}>Select Delivery Location</h5>
            <div style={{display:'flex' , justifyContent:'center', alignItems: 'center'}}>
                <img style={{marginRight:5}} src="/marker.png" alt="" height={50} width={50} />
                <div>
                    <h6>Ciwaruga</h6>
                    <span style={{fontSize:13}}>jl. Ciwaruga No 14, kec. Gegerkalong, Kab. Bandung barat Bandung 13764, Indonesia</span>
                </div>
            </div>
            <Button onClick={props.closeMap} style={{marginTop:10 ,border:'none', backgroundColor:'#433434', width: '100%', color:'white'}}>Confirm Location</Button>
        </div>
    )
    const MyLoc = ()=>(
        <div className="mapInfo" style={{backgroundColor:'white', width: 300, padding:' 20px 10px', margin:'10px 10px'}}>
            <h5 style={{marginLeft:10}}>Select My Location</h5>
            <div style={{display:'flex' , justifyContent:'center', alignItems: 'center'}}>
                <img style={{marginRight:5}} src="/marker.png" alt="" height={50} width={50} />
                <div>
                    <h6>Ciwaruga</h6>
                    <span style={{fontSize:13}}>jl. Ciwaruga No 14, kec. Gegerkalong, Kab. Bandung barat Bandung 13764, Indonesia</span>
                </div>
            </div>
            <Button onClick={props.closeMap} style={{marginTop:10 ,border:'none', backgroundColor:'#433434', width: '100%', color:'white'}}>Confirm Location</Button>
        </div>
    )

    const [show, setShow] = useState(false)
    const showInfo= ()=>{
        setShow(true)
    }

    return (
        <>
            <Modal
                size="lg"
                show={props.map}
                onHide={props.closeMap}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body>
                <ReactMapGL 
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxApiAccessToken='pk.eyJ1Ijoicmlrb2ZybW5kbyIsImEiOiJja3c5MmVrbnIxZzFjMm5wcDB3eDJtdGRzIn0.GH1tBKPJtsxwup1sYg3D0Q'
                {...viewport}
                onViewportChange={(newView) => setViewport(newView)}
                >
                    {!show ? '' : loc == 'http://localhost:3000/cart'? info() : MyLoc()}
                    <Marker latitude={-6.865321} longitude={107.574414}>
                        <button style={{backgroundColor:'transparent', border: 'none'}} onClick={showInfo}><img src="/marker.png" alt="" width={viewport.zoom * 3} height={viewport.zoom * 3} / ></button>
                    </Marker>
                </ReactMapGL>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MapBox;  