import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {getBrand} from "../api/brandCategory";

const Brand = () => {
  let [brand,setBrand] = useState([])

  useEffect(()=>{
    getBrand().then(res=>{
        setBrand(res.data.response)
    })
  },[])

  return (
    <Card className='p-5'>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {brand && brand.map((item:any,index) => (
          <tr key={index}>
            <td>{item.name}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
export default Brand

