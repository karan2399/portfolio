import defaultContent from "./content.json";

const defaultContentUrl =
  "https://gist.githubusercontent.com/karan2399/57dd5b27216e6925fd2b49877c87bc65/raw/portfolio_content.json";

const isRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const hasStrings = (value, keys) =>
  isRecord(value) && keys.every((key) => typeof value[key] === "string");

const isSectionCopy = (value) =>
  hasStrings(value, ["eyebrow", "description"]) && isStringArray(value.headline);

const isContent = (content) =>
  isRecord(content) &&
  hasStrings(content.site, [
    "title", "description", "brand", "brandSuffix", "contactLabel",
    "contactUrl", "navigationLabel", "openMenuLabel", "closeMenuLabel",
  ]) &&
  Array.isArray(content.site.navigation) &&
  content.site.navigation.every((link) => hasStrings(link, ["href", "label"])) &&
  hasStrings(content.hero, [
    "eyebrow", "description", "contactLabel", "contactUrl", "socialLabel",
    "profileImage", "profileImageAlt", "availability", "yearsExperience",
    "yearsExperienceLabel", "skillsHeading", "scrollLabel",
  ]) &&
  isStringArray(content.hero.headline) &&
  isStringArray(content.hero.skills) &&
  Array.isArray(content.hero.socialLinks) &&
  content.hero.socialLinks.every((link) => hasStrings(link, ["id", "label", "href"])) &&
  hasStrings(content.about, ["eyebrow", "quote"]) &&
  isStringArray(content.about.headline) &&
  isStringArray(content.about.paragraphs) &&
  Array.isArray(content.about.highlights) &&
  content.about.highlights.every((item) => hasStrings(item, ["icon", "title", "description"])) &&
  isSectionCopy(content.projectsSection) &&
  hasStrings(content.projectsSection, [
    "empty", "carouselLabel", "viewDetailsFor", "viewDetailsAction", "viewAll",
    "viewAllUrl", "previous", "next",
  ]) &&
  Array.isArray(content.projects) &&
  isSectionCopy(content.experimentsSection) &&
  hasStrings(content.experimentsSection, ["technologies", "liveDemo", "github", "empty"]) &&
  Array.isArray(content.experiments) &&
  isSectionCopy(content.experienceSection) &&
  Array.isArray(content.experience) &&
  content.experience.every(
    (item) =>
      hasStrings(item, ["period", "role", "company", "description"]) &&
      isStringArray(item.technologies) &&
      typeof item.current === "boolean",
  ) &&
  hasStrings(content.testimonialsSection, ["eyebrow", "previous", "next", "goTo"]) &&
  isStringArray(content.testimonialsSection.headline) &&
  Array.isArray(content.testimonials) &&
  content.testimonials.every((item) => hasStrings(item, ["quote", "author", "role", "avatar"])) &&
  isSectionCopy(content.contactSection) &&
  hasStrings(content.contactSection, [
    "informationHeading", "availabilityHeading", "availabilityDescription",
  ]) &&
  hasStrings(content.contactSection.form, [
    "name", "namePlaceholder", "email", "emailPlaceholder", "message",
    "messagePlaceholder", "send", "sending", "success", "error", "missingEmailConfig",
  ]) &&
  Array.isArray(content.contactSection.contactInfo) &&
  content.contactSection.contactInfo.every((item) =>
    hasStrings(item, ["icon", "label", "value", "href"]),
  ) &&
  hasStrings(content.projectDetail, [
    "back", "eyebrow", "demo", "about", "highlights", "technologies",
    "tryDemo", "demoWarning", "email", "password", "copy", "copied",
    "clipboardUnavailable", "copyError", "source", "repository", "github",
    "role", "credentialsTemplate",
  ]) &&
  hasStrings(content.messages, ["contentError"]) &&
  content.projects.every(
    (project) =>
      hasStrings(project, [
        "slug", "title", "description", "overview", "role", "liveDemoUrl", "github",
      ]) &&
      isStringArray(project.tags) &&
      isStringArray(project.highlights) &&
      (project.image === undefined || typeof project.image === "string") &&
      (project.screenshots === undefined ||
        (Array.isArray(project.screenshots) &&
          project.screenshots.every((image) => hasStrings(image, ["src", "alt", "caption"])))) &&
      (project.demoCredentials === undefined ||
        hasStrings(project.demoCredentials, ["email", "password", "note"])),
  ) &&
  content.experiments.every(
    (experiment) =>
      isRecord(experiment) &&
      typeof experiment.slug === "string" &&
      typeof experiment.name === "string" &&
      typeof experiment.description === "string" &&
      isStringArray(experiment.technologies),
  ) &&
  new Set(content.projects.map((project) => project.slug)).size ===
    content.projects.length &&
  new Set(content.experiments.map((experiment) => experiment.slug)).size ===
    content.experiments.length;

export async function fetchContent(signal) {
  const url = import.meta.env.VITE_CONTENT_URL || defaultContentUrl;
  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Could not load portfolio content (${response.status}).`);
  }

  const content = await response.json();
  if (!isContent(content)) {
    throw new Error("The content JSON does not match the required portfolio structure.");
  }

  return content;
}

export { defaultContent };
