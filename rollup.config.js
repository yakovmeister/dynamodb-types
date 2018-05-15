import typescript from 'rollup-plugin-typescript2'

export default {
  entry: 'src/dynamo.ts',
  dest: 'dist/dynamo.js',
  format: 'es',
  plugins: [
    typescript()
  ]
}
