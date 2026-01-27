# IPsec PQC Performance Evaluation Extension

## Overview

This contribution significantly extends the original project by introducing a complete workflow for **Post-Quantum Cryptography (PQC) evaluation over IPsec tunnels**, combined with **automated performance measurements** and **advanced visualizations**.

The main goal of this work is to enable **dynamic configuration, execution, and analysis of IPsec tunnels using PQC algorithms**, while providing an intuitive user interface and rich performance metrics through Grafana.

---

## Key Achievements

### Dynamic IPsec Tunnel with PQC Algorithms

- Introduced a fully functional **IPsec tunnel between two Security Gateways (SecGW1 and SecGW2)**.
- Enabled **dynamic selection and modification of PQC algorithms** used in the IPsec tunnel without redeploying containers.
- Ensured compatibility with **currently supported liboqs algorithms**, replacing deprecated ones where necessary.
- Automated tunnel teardown and re-establishment when the cryptographic algorithm changes.

---

### Portal Integration for Experiment Control

- Extended the **Portal UI** with a new form that allows users to:
  - Select the **PQC algorithm** used in the IPsec tunnel.
  - Configure **iperf parameters** (bandwidth, duration, intervals, message size, parallel connections, etc.).
- Unified the management of both **TLS experiments and IPsec + iperf experiments** within the same interface.
- Added validation and experiment handling logic to ensure consistent and reproducible test executions.

---

### Automated iperf Performance Measurements

- Integrated **iperf** as a first-class performance measurement tool in the platform.
- Enabled users to launch **iperf client requests directly from the Portal**, routed through the IPsec tunnel.
- Supported multiple iperf flags and configurations to perform detailed **throughput and network performance analysis**.
- Designed a dedicated service to orchestrate iperf execution and collect results automatically.

---

### Advanced Metrics Collection and Visualization

- Extended **Grafana dashboards** to support the new IPsec and iperf functionalities.
- Added new visualizations for:
  - Bandwidth metrics.
  - IPsec tunnel-related performance indicators.
  - iperf execution results across different PQC configurations.
- Integrated an additional data source to dynamically load experiment results and metrics.
- Improved the default Grafana experience with preconfigured dashboards tailored to the new workflow.

---

### Containerized and Scalable Architecture

- Added new containers to support:
  - IPsec Security Gateways.
  - iperf execution and metrics exposure.
  - Dynamic routing and traffic forwarding through the tunnel.
- Updated orchestration to ensure correct networking, routing, and service dependencies.
- Maintained consistency across Docker and Kubernetes environments.

---

## Impact

With these enhancements, the project evolves from a static cryptographic testing setup into a **fully interactive platform for evaluating PQC-enabled IPsec tunnels under real network load**.

Users can now:
- Dynamically switch PQC algorithms over an IPsec tunel.
- Generate controlled network traffic.
- Measure performance impacts over IPsec tunnels in real time.
- Visualize and compare more results through Grafana dashboards.

This makes the platform especially valuable for **research, benchmarking, and experimentation in post-quantum secure networking**.

---

## Notes

- Several internal changes were required to adapt to updates in liboqs and remove deprecated algorithms.
- Some modifications focus on test parameters and configuration consistency to ensure reliable experiment execution.

---

## License

This project follows the license defined in the main repository.
