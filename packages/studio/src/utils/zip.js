export default function zip(arrays) {
  return arrays[0].map((_, i) => arrays.map((array) => array[i]));
}
