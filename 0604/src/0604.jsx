import { useState } from "react"
//import './productList.css';

//상품리스트를 보기, 등록하기 기능
export default function ProductList(){

    /*
        productNo : 상품 번호
        Name:상품명
        Price:상품 가격
        isLike:좋아요
        star:별점
    */

    let [productList, setproductList] = useState([
        {
            productNo : 1,
            productName : '에어팟2',
            productPrice: '300,000',
            isLike : true,
            productImg : "/image/react-img-product-1.jpg",
            star : 3
        },
        {
            productNo : 2,
            productName : '에어팟2',
            productPrice: '150,000',
            isLike : true,
            productImg : "/image/react-img-product-2.jpg",
            star : 3
        },
        {
            productNo : 3,
            productName : '한우세트',
            productPrice: '30,000',
            isLike : false,
            productImg : "/image/react-img-product-3.jpg",
            star : 5
        },
        {
            productNo : 4,
            productName : '에어컨',
            productPrice: '300,000',
            isLike : true,
            productImg : "/image/react-img-product-4.jpg",
            star : 2
        },
        {
            productNo : 5,
            productName : '키보드',
            productPrice: '300,000',
            isLike : true,
            productImg : "/image/react-img-product-5.jpg",
            star : 3
        },
        {
            productNo : 6,
            productName : '아이폰',
            productPrice: '300,000',
            isLike : true,
            productImg : "/image/react-img-product-6.jpg",
            star : 1
        }
    ]);

    return(
        <div className="product-content">
            <div className="title"><span>상품등록</span></div>
            <div className="product-list">
                {productList.map(function(item, index){
                    return <Product key={"product" + index} product={item} productList={productList} setproductList={setproductList}/>
                })}
            </div>

            <RegProduct productList={productList} setproductList={setproductList}/>
        </div>
    )
}

//상품 1개를 그리는 컴포넌트
function Product(props){
    const product = props.product; //부모 컴포넌트에서 전달한 상품 1개의 정보
    const setproductList = props.setproductList;
    const productList = props.productList;

    function like(){
        product.isLike = !product.isLike; //좋아요 > 취소 또는 취소 > 좋아요.
        setproductList([...productList]) //?? 이게 왜 되는거지?
    }

    return (
        <div className="product">
            <div className="product-img">
                <img className="img" src={product.productImg} />
            </div>
            <div className="product-info">
                <div className="product-title">{product.productName}</div>
            </div>
            <div className="product-price">
                <div className="product-price">{product.productPrice}

                <span> 원</span>
                </div>
            </div>
            <div className="star-rate">
                <StarRate star={product.star} />
            </div>
            <div className="like">
                {product.isLike ? <span onClick={like}>❤</span> : <span onClick={like}>💔</span>}
            </div>
        </div>
    )
}

//상품에 대한 정보를 기르는 컴포넌트
function StarRate(props){
    const star = props.star;

    const starArr = new Array();
    for(let i = 0 ; i < star ; i++){
        starArr.push(
            <span key={"star"+i}>💥</span>
        );
    }

    return (
        <>{starArr}</>
    )
}

//상품 정보 등록 정보
function RegProduct(props){
    const setproductList = props.setproductList;
    const productList = props.productList;

    let [productNo, setProductNo] = useState('');
    let [productName, setProductName] = useState('');
    let [productPrice, setProductPrice] = useState('');
    let [productImgSrc, setProductImgSrc] = useState('');
    let [productStar, setProductStar] = useState(1);

    function updProductNo(e){
        setProductNo(e.target.value);
    }
    function updProductName(e){
        setProductName(e.target.value);
    }
    function updProductPrice(e){
        setProductPrice(e.target.value);
    }
    function updProductStar(e){
        setProductStar(e.target.value);
    }
    function updProductImgSrc(e){
        setProductImgSrc(e.target.value);
    }
    function RegProduct(){
        const product = {
            productNo : productNo,
            productName : productName,
            productPrice : productPrice,
            isLike : false,
            Star : productStar,
            productImg : '/image/react-img-product-' + productImgSrc + '.jpg'

        };

        productList.push(product);
        setproductList([...productList]);
        setProductNo('');
        setProductName('');
        setProductPrice('');
        setProductStar(1);
        setProductImgSrc('');
    }

    return(
        <div className="regist-wrap">
            <div>
                <label htmlFor="productNo">상품번호</label>
                <input type="text" id="productNo" value={productNo} onChange={updProductNo} />
            </div>
            <div>
                <label htmlFor="productName">상품이름</label>
                <input type="text" id="productName" value={productName} onChange={updProductName} />
            </div>
            <div>
                <label htmlFor="productPrice">상품가격</label>
                <input type="text" id="productPrice" value={productPrice} onChange={updProductPrice} />
            </div>
            <div>
                <label htmlFor="productStar">별점</label>
                <input type="text" id="productStar" value={productStar} onChange={updProductStar} />
            </div>
            <div>
                <label htmlFor="productImgSrc">상품 이미지 경로</label>
                <input type="text" id="productImgSrc" value={productImgSrc} onChange={updProductImgSrc} />
            </div>
            <div>
                <button onClick={RegProduct}>등록하기</button>
            </div>
        </div>
    )
}