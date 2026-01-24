import React from 'react'
import { Pagination } from 'react-bootstrap'
export const Paginator = ({noPages=0, onPress , currentPage=1}) => {
    return (
        <Pagination className='justify-content-center'>
            {currentPage !== 1 && <Pagination.First onClick={() => onPress(1)} />}
            <Pagination.Prev  onClick={() => onPress(currentPage-1)} disabled={currentPage === 1}/>
            {
                new Array(noPages).fill(0).map((_,index) => (
                    <Pagination.Item active={index+1 === currentPage} onClick={() => onPress(index+1)} key={index} >{index+1}</Pagination.Item>
                ))
            }
            <Pagination.Next  onClick={() => onPress(currentPage+1)} disabled={currentPage === noPages}/>
            {currentPage !== noPages && <Pagination.Last onClick={() => onPress(noPages)} />}
        </Pagination>
    )
}
