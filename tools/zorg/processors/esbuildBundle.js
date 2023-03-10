import esbuild from 'esbuild';
import glob from 'glob';

export default function(options) {
  const { src, dest, sourcemap = false } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
    sourcemap,
    // plugins: [
    //   {
    //     name: '~',
    //     setup(build) {
    //       build.onResolve({ filter: /^\zorg$/ }, async hey => {
    //         console.log(hey);
    //         const result = await build.resolve('~', { resolveDir: '../' })
    //         if (result.errors.length > 0) {
    //           return { errors: result.errors }
    //         }
    //         return { path: result.path, external: true }
    //       })
    //     },
    //   }
    // ]
  });
}
