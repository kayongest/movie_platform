export function Navbar() {
  return (
    <div class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand ms-5" href="#">
        Movie DB
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Link
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
