import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {getPetCategory} from "../api/PetCategory";

const PetCategory = () => {
  let [category,setCategory] = useState([])

  useEffect(()=>{
    getPetCategory().then(res=>{
      setCategory(res.data.response)
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
          {category && category.map((item:any,index) => (
          <tr key={index}>
            <td>{item.name}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
export default PetCategory

