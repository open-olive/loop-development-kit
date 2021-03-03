import { buildAptitudeId, buildAptitudePath } from "./src/components/aptitudes/aptitudePaths";
import { aptitudes } from "./src/components/aptitudes/aptitudeData";

export const createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(
    `./src/templates/aptitudeTemplate.tsx`
  )

  Object.values(aptitudes).forEach(aptitude => {
    createPage({
      path: buildAptitudePath(aptitude),
      component: blogPostTemplate,
      context: {
        aptitudeId: buildAptitudeId(aptitude),
      },
    })
  })
}
