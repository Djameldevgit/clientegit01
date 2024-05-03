import React from 'react'

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
    return (
        <>
            {
                result < 9 * (page - 1) ? '' : 

                !load && <button className="btn btn-warning mx-auto d-block"
                onClick={handleLoadMore}>
                    Charger plus
                </button>
            }
            
        </>
    )
}

export default LoadMoreBtn
