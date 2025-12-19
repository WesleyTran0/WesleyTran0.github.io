Shorelark is a simulation of evolution powered by neural networks and genetic algorithms.

With the growing conversation around AI and machine learning, I wanted to explore these
concepts hands-on while also diving into Rust—a language I'd been eager to learn at a larger
project scale, beyond simple exercises and isolated tutorials.

I chose to follow Patryk Wychowaniec's ["Learning to Fly"](https://pwy.io/posts/learning-to-fly-pt1/) series as my guide for this project.
The series not only walked me through Rust's syntax and core concepts in a practical context,
but also handled the underlying mathematics of the neural network and genetic algorithm implementation.
More importantly, it provided a solid baseline that I could understand, build upon, and
eventually expand with my own ideas.

Each "bird" in the simulation has a simple neural network brain that controls its movement
and a simulated field of vision to detect food. Birds start with randomized behaviors,
and after each generation, those that found the most food are selected to reproduce—passing on
(and slightly mutating) their neural network weights. Over time, the population evolves to become
increasingly efficient at locating food, demonstrating natural selection in action.

The project was built in Rust and compiled to WebAssembly, making it accessible directly in the browser.
