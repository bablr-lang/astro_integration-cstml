import vitePluginCstmlToJsx from '@bablr/vite_plugin-cstml-to-jsx';

const contentModuleTypes = `declare module 'astro:content' {
	interface Render {
		'.cstml': Promise<{
		}>;
	}
}`;

function safeParseFrontmatter(code, id) {
  try {
    return parseFrontmatter(code, { frontmatter: 'empty-with-spaces' });
  } catch (e) {
    if (e.name === 'YAMLException') {
      e.loc = { file: e.id, line: e.mark.line + 1, column: e.mark.column };
      e.message = e.reason;
      throw e;
    } else {
      throw e;
    }
  }
}

export default function cstml() {
  return {
    name: '@bablr/cstml',
    hooks: {
      ['astro:config:setup']: (api) => {
        api.addPageExtension('.cstml');

        api.addContentEntryType({
          extensions: ['.cstml'],
          getEntryInfo({ fileUrl, contents }) {
            const parsed = safeParseFrontmatter(contents, fileURLToPath(fileUrl));
            return {
              data: parsed.frontmatter,
              body: parsed.content.trim(),
              slug: parsed.frontmatter.slug,
              rawData: parsed.rawFrontmatter,
            };
          },
          contentModuleTypes,
        });

        api.updateConfig({
          vite: {
            plugins: [vitePluginCstmlToJsx(api.config)],
          },
        });
      },
    },
  };
}
