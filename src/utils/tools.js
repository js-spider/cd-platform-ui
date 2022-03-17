
import md5 from 'md5';

export const delay = (function () {
  const timer = {};
  return (fn, ms = 300) => {
    const mdFn = md5(fn.toString());
    if (timer[mdFn]) {
      clearTimeout(timer[mdFn]);
    }
    timer[mdFn] = setTimeout(() => {
      fn && fn();
      delete timer[mdFn];
    }, ms);
  };
}());


export const handleDownload = (file) => {
  console.log('file.vue: 27 >>>>> ', file);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.download = file.name;
  link.href = file.path; // res 设置为 blob
  document.body.appendChild(link);
  link.click();
  // URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
  return true;
};


export default {};


