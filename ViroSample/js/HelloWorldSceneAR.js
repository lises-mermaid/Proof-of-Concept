'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad,
  ViroVideo
} from 'react-viro'

export class HelloWorldSceneAR extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
    text: ''
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...' : 'No Tracking'
      } />
    )
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker
          target={'birthdayCard'}
          onAnchorFound={
            () => this.setState({
                text: 'Viro is Working!'
            })}
        >
          <ViroNode key="card">
            <ViroNode
              opacity={0} position={[0, -0.02, 0]}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation
                }}
            >
              <ViroFlexView
                  rotation={[-90, 0, 0]}
                  height={0.03}
                  width={0.05}
                  style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >
                  {/* <ViroImage
                    height={0.015}
                    width={0.015}
                    style={styles.image}
                    source={require('./res/avatar.png')}
                  /> */}
                  <ViroText
                    textClipMode="None"
                    text="Happy Birthday!"
                    scale={[0.15, 0.15, 0.15]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
                <ViroFlexView
                  onTouch={() => alert('twitter')}
                  style={styles.subText}
                >
                  <ViroText
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="@VladimirNovick"
                    scale={[0.01, 0.01, 0.01]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode>
              <ViroVideo
                source={require('../Pears.mp4')}
                loop={true}
                position={[0, 2, -5]}
                scale={[2, 2, 0]}
              />
              <ViroText
                text="www.viromedia.com"
                rotation={[-90, 0, 0]}
                scale={[0.01, 0.01, 0.01]}
                style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false
      })
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: 0.5,
    fontFamily: 'Roboto',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: 0.5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.5
  }
})

ViroARTrackingTargets.createTargets({
  birthdayCard: {
    source: require('./res/image.jpg'),
    orientation: 'Up',
    physicalWidth: 0.20 // real world width in meters
  }
})


module.exports = HelloWorldSceneAR

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center"
//   }
// })

// export default class HelloWorldSceneAR extends Component {
//   constructor() {
//     super()

//     // Set initial state here
//     this.state = {
//       text: "Initializing AR..."
//     };

//     // bind 'this' to functions
//     this._onInitialized = this._onInitialized.bind(this);
//   }

//   render() {
//     return (
//       <ViroARScene onTrackingUpdated={this._onInitialized}>
//         <ViroText
//           text={this.state.text}
//           scale={[0.5, 0.5, 0.5]}
//           position={[0, 0, -1]}
//           style={styles.helloWorldTextStyle}
//         />
//         <ViroVideo
//           source={require("../Pears.mp4")}
//           loop={true}
//           position={[0,2,-5]}
//           scale={[2, 2, 0]}
//         />
//       </ViroARScene>
//     )
//   }

//   _onInitialized(state, reason) {
//     if (state == ViroConstants.TRACKING_NORMAL) {
//       this.setState({
//         text: "Hello World!"
//       });
//     } else if (state == ViroConstants.TRACKING_NONE) {
//       // Handle loss of tracking
//     }
//   }
// }

