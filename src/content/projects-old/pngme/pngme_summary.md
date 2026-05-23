PNGme is a command line tool written fully in Rust that encodes, decodes, and manages hidden messages within PNG files.

This was my first project in Rust and I wanted a project that would familiarize me with the language's syntax
and allow me to create an application in a space that I was unfamiliar with: command line applications. Having never
thought about the development of CLI tools, and working with a memory-safe language advertised as the future
of low-level programming, I figured I should begin my break away from full-stack development.

[Robert Heaton](https://robertheaton.com)'s guide is structured in the way I think every lesson or guide should be. The [PNGme guide](https://jrdngr.github.io/pngme_book/introduction.html)
gives the developer:

1. **Structure**: You are given template functions and modules to write, what's needed for input and output.
   How you design them and what types you use to represent data is up to the developer.
2. **Unit Tests**: Test suites to not only ensure that the developer is creating an accurate app, but also to introduce
   the format and testing norms that exist in Rust.
3. **Documentation**: Including both documentation needed to understand how PNG files work and how we can exploit that to
   encode messages, but also documentation where developers can find insight for extensions, testing, and just more cool stuff.

The tool itself works by leveraging the PNG file format's chunk-based structure. PNG files are organized into discrete chunks,
each with a type code and data payload. PNGme adds custom chunks containing encoded messages that don't affect the image's appearance,
then retrieves or removes based on a command. The four core operations—encode, decode, remove, and print—are all
handled through command line arguments.

Beyond Rust fundamentals like ownership and pattern matching, this project taught me how to navigate and integrate external crates,
parse command line arguments, and work from a technical specification rather than a how-to tutorial.
