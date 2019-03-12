import * as React from 'react';

class Heightmap2 extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
  }
  componentDidMount() {
    const {width, height, terrain, index} = this.props;
    const ctx = this.canvas.current.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let v = (terrain[x][y][index] + 1) * 128;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  componentDidUpdate() {
    const {width, height, terrain, index} = this.props;
    const ctx = this.canvas.current.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let v = (terrain[x][y][index] + 1) * 128;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  render() {
    const {width, height} = this.props;
    return (
      <div className="heightmap">
        <canvas height={height} width={width} ref={this.canvas} />
        <span>sum heightmaps</span>
      </div>
    );
  }
}

class Heightmap extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
  }
  componentDidMount() {
    const {width, height, terrain, index} = this.props;
    const ctx = this.canvas.current.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let v = (terrain[x][y][index + 1] + 1) * 128;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  componentDidUpdate() {
    const {width, height, terrain, index} = this.props;
    const ctx = this.canvas.current.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let v = (terrain[x][y][index + 1] + 1) * 128;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
  render() {
    const {
      width,
      height,
      removeOctave,
      updateOctave,
      index,
      octaves,
    } = this.props;
    const octave = octaves[index];
    return (
      <div className="heightmap">
        <canvas
          onClick={() => removeOctave(index)}
          height={height}
          width={width}
          ref={this.canvas}
        />
        <span>factor</span>
        <input
          onChange={e =>
            updateOctave(index, 'factor', parseFloat(e.target.value))
          }
          min="0"
          max="3"
          step="0.05"
          value={octave.factor}
          type="range"
        />
        <span>{octave.factor}</span>
        <span>freqX</span>
        <input
          onChange={e =>
            updateOctave(index, 'freqX', parseFloat(e.target.value))
          }
          min="0"
          max="1"
          step="0.05"
          type="range"
          value={octave.freqX}
        />
        <span>{octave.freqX}</span>
        <span>freqY</span>
        <input
          onChange={e =>
            updateOctave(index, 'freqY', parseFloat(e.target.value))
          }
          min="0"
          max="1"
          step="0.05"
          value={octave.freqY}
          type="range"
        />
        <span>{octave.freqY}</span>
      </div>
    );
  }
}

export const Heightmaps = props => {
  const heightmaps = props.octaves.map((_, i) => (
    <Heightmap key={i} {...props} index={i} />
  ));

  return (
    <div className="heightmaps">
      {heightmaps}
      <button onClick={props.addOctave}>+</button>
      <Heightmap2 {...props} index={0} />
    </div>
  );
};
