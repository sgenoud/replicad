import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "A simple API",
    Svg: require("../../static/img/tools.svg").default,
    description: (
      <>
        You can easily sketch, give shape and then modify your shape with a
        streamlined API inspired by{" "}
        <a href="https://cadquery.readthedocs.io/">cadquery</a> and{" "}
        <a href="https://zalo.github.io/CascadeStudio/">cascade studio</a>.
      </>
    ),
  },
  {
    title: "In the modern javascript ecosystem",
    Svg: require("../../static/img/browser.svg").default,
    description: (
      <>
        replicad is just javascript, you have the benefit of all the libraries
        you love, the tooling you are used to and it runs in all modern
        browsers.
      </>
    ),
  },
  {
    title: "Powered by Opencascade",
    Svg: require("../../static/img/gear.svg").default,
    description: (
      <>
        You get all the nice feature of a battle tested kernel: STEP export,
        easy fillets and chamfers,...
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
