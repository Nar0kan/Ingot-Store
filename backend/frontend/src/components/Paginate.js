import React from 'react'
import { Pagination, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'


function Paginate({pages, page, keyword='', isAdmin=false}) {

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Link to={!isAdmin ?
                            `/?keyword=${keyword}&page=${x+1}`
                            : `/admin/productlist/?keyword=${keyword}&page=${x+1}`
                        }
                        key={x + 1}
                        >
                        <Button className='outline-border'>
                            {x+1}
                        </Button>
                    </Link>
                    //active={x+1 === page}
                ))}
            </Pagination>
        )   
    )
}

export default Paginate
