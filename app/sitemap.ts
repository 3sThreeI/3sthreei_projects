import { MetadataRoute } from "next";

const baseUrl = "https://3sthreei.com";

const routes = [
    "",
    "/about",
    "/faq",
    "/projects",
    "/services/application",
    "/services/audit",
    "/contact-form",
    "/services/design",
    "/services/gaming",
    "/services/web",
    "/unavailable",
    //   for documentation 
    "/projects/view/docs/e-commerce",
    // for Blog
    "/blog/why-website-not-ranking-on-google"
];

const locales = ["en", "fr"] as const;

function getPriority(route: string) {
    if (route === "") return 1.0;
    if (route === "/about" || route === "/projects" || route.startsWith("/services")) return 0.8;
    if (route === "/faq") return 0.6;
    if (route === "/unavailable") return 0.4;
    return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const urls: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        const enUrl = `${baseUrl}/en${route}`;
        const frUrl = `${baseUrl}/fr${route}`;

        // ✅ EN entry
        urls.push({
            url: enUrl,
            lastModified: now,
            changeFrequency: "daily",
            priority: getPriority(route),
            alternates: {
                languages: {
                    en: enUrl,
                    fr: frUrl,
                },
            },
        });

        // ✅ FR entry
        urls.push({
            url: frUrl,
            lastModified: now,
            changeFrequency: "daily",
            priority: getPriority(route),
            alternates: {
                languages: {
                    en: enUrl,
                    fr: frUrl,
                },
            },
        });
    });

    return urls;
}