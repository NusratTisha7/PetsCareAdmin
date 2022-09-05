import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {Offer} from "../api/offer";

const Offers = () => {
  let [offer,setOffer] = useState([])

  useEffect(()=>{
    Offer().then(res=>{
        setOffer(res.data.response)
    })
  },[])

  return (
    <Card className='p-5'>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Sub Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {offer && offer.map((item:any,index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.subTitle}</td>
            <td>{item.description}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
export default Offers

