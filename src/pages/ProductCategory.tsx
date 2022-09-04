import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {getProductCategory} from "../api/productCategory";

const ProductCategory = () => {
  let [category,setCategory] = useState([])

  useEffect(()=>{
    getProductCategory().then(res=>{
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
export default ProductCategory

