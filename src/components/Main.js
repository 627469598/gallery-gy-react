require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component} from 'react';

//let yeomanImage = require('../images/yeoman.png');
//let img = require('../images/hero-01.png');
/*class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <img src={img} />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
export default AppComponent;*/
//获取图片相关数据
//let imageDatas = require('../data/imageDatas.js');
let imageDatas = require('json!../data/imageDatas.json');
//利用自执行函数，将图片名信息转成图片URL路径信息
function getImageURL(imageDatasArr) {
	console.log(imageDatasArr.length);
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
}
imageDatas = getImageURL(imageDatas);
//console.log('dfsa', imageDatas);
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}
class ImgFigure extends Component {
	render() {
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figucaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figucaption>
			</figure>
		);
	}
}

class GalleryByReactApp extends Component {
	Constant: {
		centerPos: {
			left: 0;
			right: 0;
		},
		hPosRange: {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		}
		vPosRange: {
			x: [0, 0],
			topY: [0, 0]
		}
	},
	/*
	*/
	rearrange(centerIndex) {
		var imgsArrangeArr = this.stage.imgsArrangeArr,
		Constant = this.Constant,
		centerPos = Constant.centerPos,
		hPosRange = Constant.hPosRange,
		vPosRange = Constant.vPosRange,
		hPosRangeLeftSecX = hPosRange.leftSecX,
		hPosRangeRightSecX = hPosRange.rightSecX,
		hPosRangeY = hPosRange.y,
		vPosRangeTopY = vPosRange.topY,
		vPosRangeX = vPosRange.x,

		imgsArrangeTopArr = [],
		topImgNum = Math.ceil(Math.random() * 2), //取一个或不取
		topImgSpliceIndex = 0,
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);		
		//首先居中 centerIndex 的图片
		imgsArrangeCenterArr[0].pos = centerPos;

		//取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imageDatasArr.splice(topImgSpliceIndex, topImgNum);
		//布局位于上侧的图片
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index].pos = {
				top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
				left: getRangeRandom(vPosRangeTopX[0], vPosRangeTopX)
			}
		});
		//布局左右两侧的图片
		for (var i = 0, j = imageDatasArr.length, k = j / 2, i < j ; i++) {
			var hPosRangeLORX = null;
			//前半部分布局左边，右半部分布局右边
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i].pos = {
				top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
				left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
			}
		}
		//if (imgsArrangeTopArr && Im)
	},
	getInitalStage() {
		return {
			imgsArrangeArr: [{
				pos: {
					left: '0',
					top: '0'
				}
			}]
		};
	}
	//组件加载以后，为每张图片计算其范围
	componentDidMount() {
		//拿到舞台的大小
		var stageDOM = React.findDOMNode(this.refs.stage),
		stageW = stageDOM.scrollWidth;
		stageH = stageDOM.scrollHeight;
		halfStageW = Math.ceil(stageW / 2),
		halfStageH = Math.ceil(stageH /2);
		//拿到一个imageFigure的大小
		var imgFiguresDOM = React.findDOMNode(this.refs.imgFigure0);
		imgW = imgFiguresDOM.scrollWidth,
		imgH = imgFiguresDOM.scrollHeight,
		halfImagW = Math.ceil(imgW / 2),
		halfImagH = Math.ceil(imgH / 2);
		//计算中心图片的位置点
		this.Constant.centerPos = {
			left: halfStageW - halfImagW,
			top: halfStageH - halfImagH
		}
		//计算左，右区域图片排布的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImagW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImagW*3;

		this.Constant.hPosRange.rightSecX[0] = halfStageW = halfImagW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImagW;
		this.Constant.hPosRange.y[0] = -halfImagH;
		this.Constant.hPosRange.y[1] = stageH - halfImagH;
		//计算上侧区域排布位置的取值范围
		this.Constant.vPosRange.topY[0] = -halfImagH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImagH*3;
		this.Constant.vPosRange.x[0] = halfImagW - imgW;
		this.Constant.vPosRange.x[1] = halfImagW;

		this.rearrange(0);
	},
	render() {
		var controllerUnits = [],
		imgFigures = [];
		//console.log(imageDatas);
		imageDatas.forEach((value, index) =>{
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					}
				}
			}
			imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
		}.bind(this));
		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
}
GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;

