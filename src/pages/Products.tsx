import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { getProducts } from "../api/product";
let index = 1


const Products = () => {
    let [product, setProduct] = useState([])
    let [nextDisbale, setNextDisable] = useState(false)
    let [prevDisbale, setPrevDisable] = useState(false)

    useEffect(() => {
        products()
    }, [])

    const products = async()=>{
        await getProducts(index).then(res => {
            setProduct(res.data.response)
        })
    }

    const prev = () => {
        setNextDisable(false)
        if (index - 1 > 0) {
            index -= 1
            products()
        } else {
            index = 1
            setPrevDisable(true)
        }
    }

    const next = () => {
        setPrevDisable(false)
        index += 1
        products()
    }

    return (
        <Card className='p-5'>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.map((item: any, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.details}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <nav aria-label="Page navigation example">
            <button disabled={prevDisbale} onClick={prev}  aria-label="Previous"> <span aria-hidden="true" >&laquo;</span> </button>
            <button  aria-label="Previous" disabled={nextDisbale} onClick={next}> <span aria-hidden="true" >&raquo;</span> </button>
            </nav>
        </Card>
    )
}
export default Products

